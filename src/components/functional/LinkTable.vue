<template>
    <Table border :columns="columns" :data="data"></Table>
</template>
<style></style>
<script>
    export default {
        data(){
            return {
                data: [{a:'a'}],
                columns: [
                    {title: '11', key: 'a', width: 150, align: 'center'}
                ],
            }
        }
    }
</script>