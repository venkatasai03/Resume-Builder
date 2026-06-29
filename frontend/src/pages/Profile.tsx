import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useAuthToken } from "@/hooks/useAuthToken";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface ProfileProps {
  name: string;
  email: string;
  bio: string;
  location: string;
}

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string(),
  location: z.string().min(1),
  bio: z.string().min(0).max(60).optional(),
});

const Profile = () => {
  const [profile, setProfile] = useState<ProfileProps>();
  const { getToken } = useAuthToken();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      const token = getToken();
      if (!token) return;

      axios.put(
        import.meta.env.VITE_BACKEND_URL + "/api/profile/update",
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast({
        title: "Profile Data Changed successfully!",
        variant: "default",
      });
    } catch (error) {
      console.error("Caught an error:", error);
      toast({
        title: "Failed to change profile data.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    try {
      const token = getToken();
      if (!token) return;

      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setProfile(res.data);
          form.reset({
            name: res.data.name,
            email: res.data.email,
            location: res.data.location,
            bio: res.data.bio,
          });
        });
    } catch (error: unknown) {
      console.error("Caught an error:", error);
      toast({
        title: "Failed to generate profile.",
        variant: "destructive",
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-600 to-gray-300  flex flex-col items-center px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-900 mt-6 mb-8">
        📜 Your Profile
      </h2>
      <div className="flex flex-col items-center justify-center">
        <div className="bg-gray-800 rounded-full h-40 w-40 flex justify-center items-center">
          <img height="60%" width="60%" src="/logo.svg" alt="" />
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-3xl mx-auto py-10 "
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Name</FormLabel>
                  <FormControl>
                    <Input placeholder={profile?.name} type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={profile?.email}
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        profile?.location ? profile.location : "Location"
                      }
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={profile?.bio ? profile.bio : "Bio"}
                      className="resize-none bg-black text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    You can @mention other users and organizations.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting
                ? "Changeing Info..."
                : "Change Info"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
