<template>
  <div class="home">
    <HelloWorld msg="Bienvenue chez Groupomania!"/>
    <view2 post="Qu'avez-vous envie de partager?" {{data.likes}}/>
    <div>
    


    <!-- v-for -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import view2 from '@/components/body.vue'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    view2,
  },
};


  // computed: {
	// 	...mapGetters({
	// 		copyright: "copyright"
	// 	}),
	// 	...mapState({
	// 		restaurantName: "restaurantName",
	// 		shoppingCart: "shoppingCart",
	// 		simpleMenu: "simpleMenu"
	// 	})
	// }

</script>
