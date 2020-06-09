<template>
<div>
    <h1>admin/home/index</h1>
</div>

</template>

<script>
import Auth from '@/util/auth'
export default {
    name:"home",
    created(){
        if(!Auth.getToken()){
            this.$router.push('/login');
            console.log('未登录 dispatch：login');
        }

        var arr=[];
        arr.replace([]);
    }
}
</script>