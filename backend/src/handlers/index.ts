import type { Request, Response } from 'express'
import slug from 'slug'
import User from "../models/User"
import { checkPassword, hashPassword } from '../utils/auth'
import { generateJWT } from '../utils/jwt'

export const createAccount = async (req: Request, res: Response) => {    
    const {email, password} = req.body

    const userExists = await User.findOne({email})
    if(userExists) {
        const error = new Error('Un usuario con este email ya esta registrado')
        res.status(409).json({error: error.message})
        return
    }

    const handle = slug(req.body.handle, '')
    const handleExists = await User.findOne({handle})
    if(handleExists) {
        const error = new Error('Nombre de usuario no disponible')
        res.status(409).json({error: error.message})
        return
    }

    const user = new User(req.body)
    user.password = await hashPassword(password)
    user.handle = handle

    await user.save()
    res.status(201).json({msg: 'Registro Creado Correctamente'})
    return
}

export const login = async (req: Request, res: Response) => {    
    const {email, password} = req.body

    const user = await User.findOne({email})
    if(!user) {
        const error = new Error('El usuario no existe')
        res.status(404).json({error: error.message})
        return
    }

    //comprobar el password
    const isPasswordCorrect = await checkPassword(password, user.password)
    if(!isPasswordCorrect) {
        const error = new Error('La contraseña es incorrecta')
        res.status(401).json({error: error.message})        
        return
    }

    const token = generateJWT({id: user._id})

    res.send(token)
}

export const getUser = async (req: Request, res: Response) => {
    const bearer = req.headers.authorization

    if(!bearer) {
        const error = new Error('No Autorizado')
        res.status(401).json({error: error.message})
        return
    }
}