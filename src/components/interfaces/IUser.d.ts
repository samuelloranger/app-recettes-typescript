import { IRecipe } from "./IEditRecipe"

export interface IUSer{
    email: string,
    fullName: string,
    password: string,
    recipes: Array<IRecipe>,
    slug: string
}