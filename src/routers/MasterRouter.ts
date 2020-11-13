import { Router } from 'express';
import GithubRouter from './GithubRouter';

class MasterRouter {
  private _router = Router();
  private _subrouterA = GithubRouter;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  /**
   * Connect routes to their matching routers.
   */
  private _configure() {
    this._router.use('/github', this._subrouterA);
  }
}

export = new MasterRouter().router;