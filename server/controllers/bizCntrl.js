import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createBusiness = asyncHandler(async (req, res) => {
  const {
    title,
    sdescription,
    ldescription,
    category,
    subcategory,
    address,
    country,
    city,
    additionalinfo,
    images,
    socials,
    userEmail,
  } = req.body.data;

  console.log(req.body.data);
  try {
    const business = await prisma.business.create({
      data: {
        title,
        sdescription,
        ldescription,
        category,
        subcategory,
        address,
        country,
        city,
        additionalinfo,
        images,
        socials,
        owner: { connect: { email: userEmail } },
      },
    });

    res.send({ message: "Business created successfully", business });
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("A business with address already there");
    }
    throw new Error(err.message);
  }
});

// function to get all the documents/businesses
export const getAllBusinesses = asyncHandler(async (req, res) => {
  const { filter } = req.query; // Assuming the filter is passed as a query param

  let businesses;

  if (filter) {
    businesses = await prisma.business.findMany({
      where: {
        OR: [
          { title: { contains: filter, mode: "insensitive" } },
          { city: { contains: filter, mode: "insensitive" } },
          { country: { contains: filter, mode: "insensitive" } },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Increment searchCount for matched businesses
    await Promise.all(
      businesses.map(async (business) => {
        await prisma.business.update({
          where: { id: business.id },
          data: { searchCount: { increment: 1 } },
        });
      })
    );
  } else {
    businesses = await prisma.business.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  res.send(businesses);
});

// function to get a specific document/business
export const getBusiness = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const business = await prisma.business.findUnique({
      where: { id },
    });
    res.send(business);
  } catch (err) {
    throw new Error(err.message);
  }
});
