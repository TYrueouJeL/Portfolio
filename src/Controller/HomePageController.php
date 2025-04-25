<?php

namespace App\Controller;

use App\Service\GithubService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HomePageController extends AbstractController
{
    private GithubService $githubService;

    public function __construct(GithubService $githubService)
    {
        $this->githubService = $githubService;
    }

    #[Route('/', name: 'app_home_page')]
    public function index(): Response
    {
        $repositories = $this->githubService->getPublicRepositories();

        foreach ($repositories as &$repo) {
            $repo['technologies'] = $this->githubService->getTechnologiesUsed($repo['name']);
            $repo['presentationImageUrl'] = $this->githubService->getPresentationImageUrl($repo['name']);
        }

        return $this->render('home_page/index.html.twig', [
            'repositories' => $repositories,
        ]);
    }

    #[Route('/KIRSCH', name: 'app_KIRSCH')]
    public function Kirsch(): Response
    {
        return $this->render('home_page/KIRSCH.html.twig', [

        ]);
    }

    #[Route('RPE', name: 'app_RPE')]
    public function RPE()
    {
        return $this->render('home_page/RPE.html.twig', [

        ]);
    }
}
