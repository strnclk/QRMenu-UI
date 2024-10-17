import { ref } from "vue"

export const App = () => {
  var project = ref(
    {
      projectBy: "Fupico",
      version: "v1",
      apiUrl: 'https://localhost:1923/api',
    

    }

  )

  return {
    project
  }
}




