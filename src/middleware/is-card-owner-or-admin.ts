import { RequestHandler } from "express";
import { validateToken } from "./validate-token";
import BizCardsError from "../errors/BizCardsError";
import { cardService } from "../services/card-service";

const _isCardOwnerOrAdmin: RequestHandler = async (req, res, next) => {
    try {
        const card = await cardService.getCardById(req.params.id);
        const bizNumber = req.body.bizNumber;

        if (!card || !bizNumber) {
            throw new BizCardsError(404, "id-Card or biz number not found");
        }

        if (card.bizNumber === bizNumber || req.payload?.isAdmin) {
            return next();
        } else {
    throw new BizCardsError(403, "Only the card owner or admin is allowed");
        }
    } catch (e) {
        next(e);
    }
};

export const isCardOwnerOrAdmin = [validateToken, _isCardOwnerOrAdmin];
