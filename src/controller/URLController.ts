import { Request, Response } from 'express';
import shortId from 'shortid';
import { config } from '../config/Constants';
import { URLModel } from '../database/model/URL';

export class URLController {

  public async shorten(req: Request, res: Response): Promise<void> {
    const { originURL } = req.body;
    const url = await URLModel.findOne({ originURL});
    if (url) {
      res.json(url);
    }
  
    const hash = shortId.generate();
    const shortURL = `${config.API_URL}/${hash}`; //vai encurtar a url
    const newURL =  await URLModel.create({ hash, shortURL, originURL});
    // salvar a URL no banco
    //retornar a URL que foi salva
    res.json({ originURL, hash, shortURL });
  }

  public async redirect(req: Request, res: Response) : Promise<void> {

    const { hash } = req.params;
    const url = await URLModel.findOne({ hash });

    if (url) {
      res.redirect(url.originURL);
      return;
    }

    res.status(400).json({ error: 'URL not found '});
  }
}