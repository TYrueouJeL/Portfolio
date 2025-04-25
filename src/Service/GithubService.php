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
        $files = $this->getRepositoryFiles($repoName);
        $technologies = [];

        foreach ($files['tree'] as $file) {
            $extension = pathinfo($file['path'], PATHINFO_EXTENSION);
            switch ($extension) {
                case 'php':
                    $technologies['PHP'] = true;
                    break;
                case 'js':
                    $technologies['JavaScript'] = true;
                    break;
                case 'html':
                    $technologies['HTML'] = true;
                    break;
                case 'css':
                    $technologies['CSS'] = true;
                    break;
                case 'py':
                    $technologies['Python'] = true;
                    break;
                case 'java':
                    $technologies['Java'] = true;
                    break;
                case 'cs':
                    $technologies['C#'] = true;
                // Ajoutez d'autres extensions et technologies selon vos besoins
            }
        }

        return array_keys($technologies);
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