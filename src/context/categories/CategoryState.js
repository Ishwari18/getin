import CategoryContext from "./categoryContext";
import { useState } from "react";

const CategoryState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [categories, setCategories] = useState(notesInitial)

  // Get all Notes
  const getCategories = async () => {
    // API Call 
    const response = await fetch(`${host}/api/categories`, {
      method: 'GET',
      
    });
    const json = await response.json() 
    setCategories(json)
  }


  return (
    <CategoryContext.Provider value={{ categories,  getCategories }}>
      {props.children}
    </CategoryContext.Provider>
  )

}
export default CategoryState;