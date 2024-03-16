import { request, gql } from "graphql-request";
import { GRAPHQL_BASE_URL } from "@env";
import {
  CategoryQuery,
  SliderQuery,
  PartyQuery,
  PartyByCategoryName,
  bookingPartyQuery,
} from "./query";
import { getAllBookingByEmailQuery } from "./query/BookingQuery";
const getSliders = async () => {
  return await request(GRAPHQL_BASE_URL, SliderQuery);
};

const getCategories = async () => {
  return await request(GRAPHQL_BASE_URL, CategoryQuery);
};

const getParties = async () => {
  return await request(GRAPHQL_BASE_URL, PartyQuery);
};

const getPartiesByCategoryName = async (categoryName) => {
  return await request(GRAPHQL_BASE_URL, PartyByCategoryName(categoryName));
};

const createBookingParty = async (bookingData) => {
  const result = await request(
    GRAPHQL_BASE_URL,
    bookingPartyQuery(bookingData)
  );
  return result;
};

const getAllBookingByEmail = async (email) => {
  const result = await request(
    GRAPHQL_BASE_URL,
    getAllBookingByEmailQuery(email)
  );
  return result;
};

export default {
  getSliders,
  getCategories,
  getParties,
  getPartiesByCategoryName,
  createBookingParty,
  getAllBookingByEmail,
};
