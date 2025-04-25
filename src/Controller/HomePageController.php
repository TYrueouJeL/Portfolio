<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class HomePageController extends AbstractController
{
    #[Route('/', name: 'app_home_page')]
    public function index(): Response
    {
        return $this->render('home_page/index.html.twig', [

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
