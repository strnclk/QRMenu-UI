import { ref } from "vue"

export const App = () => {
  var project = ref(
    {
      projectBy: "Fupico",
      version: "v1",
      apiUrl: 'https://api.qrmenu.fupico.com/api',
    

    }

  )

  return {
    project
  }
}




