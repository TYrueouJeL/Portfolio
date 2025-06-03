<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class GithubService
{
    private $client;
    private $username;
    private $token;

    public function __construct(HttpClientInterface $client, string $username, string $token)
    {
        $this->client = $client;
        $this->username = $username;
        $this->token = $token;
    }

    public function getPublicRepositories()
    {
        $response = $this->client->request(
            'GET',
            "https://api.github.com/users/{$this->username}/repos",
            [
                'headers' => [
                    'Authorization' => "token {$this->token}",
                    'Accept' => 'application/vnd.github.v3+json',
                ],
            ]
        );

        return $response->toArray();
    }

    public function getReadmeContent(string $repoName)
    {
        $response = $this->client->request(
            'GET',
            "https://api.github.com/repos/{$this->username}/{$repoName}/readme",
            [
                'headers' => [
                    'Authorization' => "token {$this->token}",
                    'Accept' => 'application/vnd.github.v3+json',
                ],
            ]
        );

        $readmeData = $response->toArray();
        return base64_decode($readmeData['content']);
    }

    public function getRepositoryFiles(string $repoName)
    {
        $response = $this->client->request(
            'GET',
            "https://api.github.com/repos/{$this->username}/{$repoName}/git/trees/main?recursive=1",
            [
                'headers' => [
                    'Authorization' => "token {$this->token}",
                    'Accept' => 'application/vnd.github.v3+json',
                ],
            ]
        );

        return $response->toArray();
    }

    public function getTechnologiesUsed(string $repoName)
    {
        $languages = $this->getRepositoryLanguages($repoName);
        $topics = $this->getRepositoryTopics($repoName);

        return array_merge(array_keys($languages), $topics);
    }

    public function getRepositoryLanguages(string $repoName)
    {
        $response = $this->client->request(
            'GET',
            "https://api.github.com/repos/{$this->username}/{$repoName}/languages",
            [
                'headers' => [
                    'Authorization' => "token {$this->token}",
                    'Accept' => 'application/vnd.github.v3+json',
                ],
            ]
        );

        return $response->toArray();
    }

    public function getRepositoryTopics(string $repoName)
    {
        $response = $this->client->request(
            'GET',
            "https://api.github.com/repos/{$this->username}/{$repoName}/topics",
            [
                'headers' => [
                    'Authorization' => "token {$this->token}",
                    'Accept' => 'application/vnd.github.v3+json',
                ],
            ]
        );

        return $response->toArray()['names'] ?? [];
    }

    public function getPresentationImageUrl(string $repoName)
    {
        $files = $this->getRepositoryFiles($repoName);

        foreach ($files['tree'] as $file) {
            if ($file['path'] === 'presentation.png') {
                return "https://raw.githubusercontent.com/{$this->username}/{$repoName}/main/presentation.png";
            }
        }

        return null;
    }
}