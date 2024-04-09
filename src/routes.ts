import { Router } from 'express'
//import { RoomController } from './controllers/RoomController'
import { EventController } from './controllers/EventController'
import { UserController } from './controllers/UserController'

const routes = Router()

routes.post('/events', new EventController().create)
routes.post('/users', new UserController().create)
//routes.get('/room', new RoomController().list)
//routes.post('/room/:idRoom/create', new RoomController().createVideo)
//routes.post('/room/:idRoom/subject', new RoomController().roomSubject)
export default routes