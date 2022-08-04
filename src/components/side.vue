<template>
	<aside :style="[!prop.show ? { display: 'none' } : { display: 'block' }]">
		<div class="top">
			<div class="logo">
				<img
					src="https://scontent.flim28-1.fna.fbcdn.net/v/t39.30808-6/296445143_430459115792767_472435730899642184_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFD34HrMONIly8qo6epdp0xdwQgFeHC8ox3BCAV4cLyjFPJ3Y5CMOiM2MmMtVS_t7g&_nc_ohc=_gYUXIRq9VIAX_KGNwn&tn=jEkHbpr1GDBSx5dy&_nc_ht=scontent.flim28-1.fna&oh=00_AT-YMvr5ZIq95OOSHEbnDnBaVkA-EL4Ouz0qiyFhDFqvJg&oe=62F0E00C"
				/>
				<h2>EGA<span class="danger">TOR</span></h2>
			</div>
			<div class="close" id="close-btn">
				<span class="material-icons" v-on:click="() => e('close', false)"
					>close</span
				>
			</div>
		</div>
		<div class="sidebar">
			<a href="#">
				<span class="material-icons">grid_view</span>
				<h3>Dashboard</h3>
			</a>
			<a href="#" class="active">
				<span class="material-icons">person_outline</span>
				<h3>Customers</h3>
			</a>
			<a href="#">
				<span class="material-icons">receipt_long</span>
				<h3>Orders</h3>
			</a>
			<a href="#">
				<span class="material-icons">insights</span>
				<h3>Analytics</h3>
			</a>
			<a href="#">
				<span class="material-icons">mail_outline</span>
				<h3>Messages</h3>
				<span class="message-count">26</span>
			</a>

			<a href="#">
				<span class="material-icons">logout</span>
				<h3>Logout</h3>
			</a>
		</div>
	</aside>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'

	const prop = defineProps({
		show: { required: true, type: Boolean },
	})
	const e = defineEmits(['close'])
</script>

<style lang="scss" scoped>
	aside {
		display: block;
		height: 100vh;
		.top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 1.4rem;
			.logo {
				display: flex;
				gap: 0.8rem;
				img {
					width: 2rem;
					height: 2rem;
				}
			}
		}

		.sidebar {
			display: flex;
			flex-direction: column;
			height: 86vh;
			position: relative;
			top: 3rem;

			h3 {
				font-weight: 500;
			}
			a {
				display: flex;
				color: $color-info-dark;
				margin-left: 2rem;
				gap: 1rem;
				align-items: center;
				position: relative;
				height: 3.7rem;
				transition: all 300ms ease;

				span {
					font-size: 1.6rem;
				}
			}
			:hover {
				color: $color-primary;
				span {
					margin-left: 1rem;
				}
			}
			.active {
				background: $color-light;
				color: $color-primary;
				margin-left: 0;
				span {
					color: $color-primary;
					margin-left: calc(1rem - 3px);
				}
			}
			a.active:before {
				content: '';
				width: 6px;
				height: 100%;
				background-color: $color-primary;
			}
			a:last-child {
				position: absolute;
				bottom: 2rem;
				width: 100%;
			}

			.message-count {
				background: $color-danger;
				color: $color-white;
				padding: 2px 10px;
				font-size: 11px;
				border-radius: $border-radius-1;
			}
		}
		@media screen and (max-width: 1200px) {
			.sidebar {
				h3 {
					display: none;
				}
				a {
					width: 5.6rem;
				}
				:last-child {
					position: relative;
					margin-top: 1.8rem;
				}
			}
		}
		@media screen and (max-width: 768px) {
			position: fixed;
			left: 0;
			background-color: $color-white;
			width: 18rem;
			z-index: 3;
			box-shadow: 1rem 3rem 4rem $color-light;
			height: 100vh;
			padding-right: $card-padding;
			.logo {
				margin-left: 1rem;
				h2 {
					display: inline;
				}
			}
			h3 {
				display: inline;
			}
			a {
				width: 100%;
				height: 3.4rem;
			}
			a.last-child {
				position: absolute;
				bottom: 5rem;
			}
			.close {
				display: inline-block;
				cursor: pointer;
			}
		}
	}
</style>
