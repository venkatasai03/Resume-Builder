import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useAuthToken } from "@/hooks/useAuthToken";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface ResultInterface {
  score: number;
  advice: string;
}

const formSchema = z.object({
  username: z.string().min(1),
});

const GithubScorer = () => {
  const [result, setResult] = useState<ResultInterface>();

  const { getToken } = useAuthToken();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const token = getToken();
      if (!token) return;

      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/score",
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setResult(response.data);
      toast({
        title: "Github Score Generated Successfully!",
        variant: "default",
      });
    } catch (error) {
      console.error("Caught an error:", error);
      toast({
        title: "Failed to Generate Github Score",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-600 to-gray-300  flex flex-col items-center px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-900 mt-6 mb-8">
        Find Your Github Score
      </h2>
      <div className="flex flex-col items-center justify-center">
        <div className="bg-gray-300 rounded-full h-40 w-40 flex justify-center items-center">
          <img height="60%" width="60%" src="/github-sign.png" alt="" />
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 max-w-3xl mx-auto py-10 "
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Github Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"Github Username"}
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-black">
                    Please only fill your Github Username not the whole URL
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting
                ? "Generating Score..."
                : "Generate Score"}
            </Button>
          </form>
        </Form>
      </div>

      {result !== undefined ? (
        <div className="mt-10 flex justify-center">
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Profile Evaluation
            </h2>

            <div className="text-5xl font-extrabold text-blue-600 mb-2">
              {result.score}/10
            </div>
            <p className="text-sm text-gray-500 mb-4">Overall Score</p>

            <blockquote className="italic text-gray-700 border-l-4 border-blue-400 pl-4">
              “{result.advice}”
            </blockquote>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default GithubScorer;
