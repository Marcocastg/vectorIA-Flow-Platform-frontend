<script setup>
import LineAbout from '@/components/about/lineAbout.vue';
import FooterPage from '@/components/footerPage.vue';
import NavbarLanding from '@/components/navbarLanding.vue';

</script>
<template>
    <div>
        <NavbarLanding/>
        <main>
            <RouterView/>
        </main>
        <LineAbout/>
        <FooterPage/>
    </div>
</template>