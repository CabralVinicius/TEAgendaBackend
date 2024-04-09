// Supondo que seu arquivo de rotas esteja assim:

import { Router } from 'express';
import { EventController } from './controllers/EventController';
import { UserController } from './controllers/UserController';
import { VideoController } from './controllers/VideoController';
import { ImageController } from './controllers/ImageController';

const routes = Router();

// Rotas para usuários
routes.post('/users', new UserController().create);
routes.get('/users/:id', new UserController().get);
// ... outras rotas de usuário

// Rotas para eventos
routes.post('/events', new EventController().create);
routes.get('/events/:id', new EventController().get);
routes.put('/events/:id', new EventController().update);
routes.delete('/events/:id', new EventController().delete);

// Rotas de busca de conteúdo externo
routes.get('/events/:id/videos', new EventController().getExternalVideos);
routes.get('/events/:id/images', new EventController().getExternalImages);

// Rotas para vídeos e imagens
// ... suas rotas existentes para vídeos e imagens

export default routes;
