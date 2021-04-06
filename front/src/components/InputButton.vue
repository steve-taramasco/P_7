<template>
    <form>

        <label for="file" class="label-file">
            <b-icon-image></b-icon-image>
        </label>
        <input id="file" class="input-file" type="file" @change="onFileChange">
        
            
        

    </form> 
</template>

<script>
export default {
    name: "InputButton"
}
</script>

<style scoped>

.label-file {
    cursor: pointer;
    
}
.label-file:hover {
    color: #25a5c4; 
}

/* et on masque le input */

.input-file {
    display: none;
}
</style>