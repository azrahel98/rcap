<template>
	<div class="dash">
		<div class="tardanzas">
			<v-calendar :attributes="atributtes"></v-calendar>
		</div>
		<div class="docs">
			<v-calendar></v-calendar>
			<v-calendar></v-calendar>
		</div>
	</div>
</template>
<script lang="ts" setup>
	import 'v-calendar/dist/style.css'
	import { onBeforeMount, ref } from 'vue'
	import EmployImpl from '../../../../app/implement/employ'
	import { AsistenciaDetalle } from '../../../../app/models/asistencia'

    const props = defineProps({
        dni:{type:String, required:true},
        mes:{type:String,required:true}
    })

	const asistencia = ref<AsistenciaDetalle[]>([])
    const atributtes = ref<any>([])
	var asis = new EmployImpl()
	onBeforeMount(async () => {
             asistencia.value = await asis.buscar_asistencia(props.dni,props.mes)

        asistencia.value.forEach(e => {
            atributtes.value.push({
                        description: 'Take Noah to basketball practice.',
                        isComplete: true,
                        dot:{
                                color: 'red',
                        },
                        dates:`${e.fecha}`,
                        popover: {
                            label:`${e.marca}`,
                        },
                })
        });
     })
</script>

<style lang="scss" scoped>
	.dash {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		.docs {
			display: flex;
			justify-content: space-around;
		}
	}
</style>
