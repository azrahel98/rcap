import moment from 'moment'
import { defineStore } from 'pinia'

export const AsistEstore = defineStore('asist', {
    state: () => {
        return {
            asistencia: [],
            marcaciones: [],
            mes: 0,
            año: 2022,
            showClock: true,
            showAs: false
        }
    },
    getters: {
        getAsisinDay: (state) => {
            return (day: number) => state.asistencia.filter((e) => moment(e['fecha'], 'YYYY-MM-DD').add(1).date() === day)
        },
        faltas: (state) => {
            return state.asistencia.reduce((t, e) => {
                return t + e['falta']
            }, 0)
        },
        tardanzas: (state) => {
            return state.asistencia.reduce((t, e) => {
                return t + e['tardanza']
            }, 0)
        }
    },
    actions: {
        addDay(x: any): void {
            if (this.asistencia.find((e) => e['fecha'] === x['fecha']) === undefined) {
                this.asistencia.push(x)
            }
        }
    }
})
