import { IUser } from "./IUser"

export interface IEditRecipe{
    id: string,
    slug: string
    user: Object<IUser>,
    nom: string,
    image: string,
    ingredients: string,
    instructions: string,
    key: string,
    edit: boolean,
    done: boolean
}
