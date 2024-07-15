@props([
    'link' => './pages/tables.html',
    'title' => 'Tables',
    'icon' => 'fas fa-home'
])
@php
    $active =[
        'py-2.7 shadow-soft-xl text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors',
        'bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5',
        'text-white'
    ];
    $not_active = [
        'py-2.7 text-sm ease-nav-brand my-0 mx-4 flex items-center whitespace-nowrap px-4 transition-colors',
        'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5',
        'text-slate-800'
    ];
    $class = $not_active;

    if(request()->is($link)){
        $class = $active;
    }
@endphp
<li class="mt-0.5 w-full">
    <a class="{{ $class[0] }}"
        href="{{ url($link) }}">
        <div
            class="{{ $class[1] }}">

            <i class="{{ $class[2] }} {{ $icon }}"></i>
        </div>
        <span class="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">{{ $title }}</span>
    </a>
</li>
