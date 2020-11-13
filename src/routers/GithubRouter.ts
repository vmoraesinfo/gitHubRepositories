import { NextFunction, Request, Response, Router } from 'express';
import GitHubController from '../GitHubController';
const fetch = require('sync-fetch');



class GitHubRouter {
  private _router = Router();
  private _controller = GitHubController;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
    async  _configure() {
    this._router.get('/:user', ( req: Request, res: Response, next: NextFunction) => {
        if(req.get('accept') === 'application/xml'){
            res.status(406).json(
                {
                    'status': 406,
                    'message': 'Not accepted format'
                    
                }
            );
            return;
        }
        let response = fetch('https://api.github.com/users/' + req.params.user + '/repos');
        if(response.status != 200){
            res.status(response.status).json(
                {
                    'status': response.status,
                    'message': response.statusText
                }
            );
            return;
        }
        let data = response.json();
        data = data.filter((el: { fork: boolean; }) => el.fork == false);
        let resp = {};
        let arr: any[] = [];
        data.forEach((element: any) => {
            let branchesArray: any[] = [];
            let result = fetch(element.url + '/branches' )
            let branches = result.json();
            branches.forEach((elmentBranch:any) => {
                let jsonBranch = {
                    "Branch name": elmentBranch.name, 
                    "Last Commit" : elmentBranch.commit.sha
                };
                branchesArray.push(jsonBranch);
            });
            let obj = {
                'Repository Name': element.name,
                'Owner Login': element.owner.login,
                'Branches' :  branchesArray
            };
            arr.push(obj);
        });
        resp = {'data' : arr};
        res.status(200).json(resp);
    });
  }
}

export = new GitHubRouter().router;
