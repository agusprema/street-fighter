<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>
        eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template
    </title>
    <!--     Fonts and icons     -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
    <!-- Font Awesome Icons -->
    <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script>
    <!-- Styles -->
    @livewireStyles
</head>

<body class="m-0 font-sans text-base antialiased font-normal leading-default bg-gray-50 text-slate-500">
    <x-dashboard.side-navbar />

    <main class="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
        <x-dashboard.navigation />

        {{ $slot }}

        <x-dashboard.footer />
    </main>

</body>
<!-- Popper -->
<script src="https://unpkg.com/@popperjs/core@2"></script>
@vite(['resources/js/app.js', 'resources/js/perfect-scrollbar.min.js', 'resources/js/dashboard.js'])

</html>
