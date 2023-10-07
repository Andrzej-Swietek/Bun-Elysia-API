import {Elysia, t} from "elysia";


export const profiles = new Elysia({ prefix: '/profiles' })
  .get("/:id", async ({ params, db }) => {
    try {
      const profileId = parseInt(params.id, 10);
      const profile = await db.profile.findUnique({
        where: { id: profileId },
      });

      if (!profile) {
        return {
          success: false,
          message: "Profile not found",
        };
      }

      return profile;
    } catch (error) {
      throw error;
    }
  })
  .patch("/:id", async ({ params, body, db }) => {
    try {
      const profileId = parseInt(params.id, 10);
      const { bio } = body;

      const existingProfile = await db.profile.findUnique({
        where: { id: profileId },
      });

      if (!existingProfile) {
        return {
          success: false,
          message: "Profile not found",
        };
      }

      const updatedProfile = await db.profile.update({
        where: { id: profileId },
        data: { bio },
      });

      return updatedProfile;
    } catch (error) {
      throw error;
    }
},
{
    body: t.Object({
        bio: t.String()
    })
});