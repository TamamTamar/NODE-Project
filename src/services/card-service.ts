import _ from "underscore";
import { ICardInput, IIsBusiness } from "../@types/@types";
import Card from "../db/models/card-model";
import { Logger } from "../logs/logger";
import User from "../db/models/user-model";

const generateBizNumber = async () => {
    //generate random bizNumber:
    while (true) {
        const r = _.random(1_000_000, 9_999_999);
        const dbRes = await Card.findOne({ bizNumber: r });
        if (!dbRes) {
            return r;
        }
    }
};

export const cardService = {
    createCard: async (data: ICardInput, userId: string) => {
        //userId is extracted from the JWT
        const card = new Card(data);
        //assign user id to the card:
        card.userId = userId;
        //generate biz number to the card:
        card.bizNumber = await generateBizNumber();
        Logger.log(card.bizNumber);
        return card.save();
    },


    //get all cards
    getAllCards: async () => Card.find(),

    //get card by id
    getCardById: async (id: string) => Card.findById(id),

    //get all my cards
    getCardByUserId: async (userId: string) => Card.find({ userId: userId }),

    //update card
    updateCard: async (data: ICardInput, userId: string) => {
        return Card.updateOne({ userId: userId }, data);
    },

    //like a card
    likeCard: async (userId: string) => Card.find({ likes: userId }),

    //delete card
    deleteCard: async ( id: string) => Card.findOneAndDelete({ _id: id }),


    
    /* deleteCard: async (data, id: string) => Card.findOneAndDelete({ _id: id }, data), */
};

