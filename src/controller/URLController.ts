import { Request, Response } from 'express';
import shortId from 'shortid';
import { config } from '../config/Constants';

export class URLController {

  public async shorten(req: Request, res: Response): Promise<void> {
    //ver se a URL já não existe
    //criar o hash pra essa URL
    const { originURL } = req.body;
    const hash = shortId.generate();
    const shortURL = `${config.API_URL}/${hash}` //vai encurtar a url
    // salvar a URL no banco
    //retornar a URL que foi salva
    res.json({ originURL, hash, shortURL });
  }

  public async redirect(req: Request, res: Response) : Promise<void> {
    // pegar hash da URL
    const { hash } = req.params;
    // encontrar a URL original pelo hash
    const url = {
      originURL: "https://cloud.mongodb.com/v2/61daef06bff1860d02eef904#clusters/connect?clusterId=url-shortener-dio",
      hash: "rr5NYnr6h",
      shortURL: "http://localhost:5000/rr5NYnr6h"
    }
    // redirecionar para  a URL original a partir do que for encontrado no DB
    res.redirect(url.originURL);
  }
}