import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Textarea } from "@/components/ui/textarea";
import { TagsInput } from "@/components/ui/tags-input";
import { useFieldArray } from "react-hook-form";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useAuthToken } from "@/hooks/useAuthToken";

const formSchema = z.object({
  name: z.string().min(5).max(15),
  email: z.string().email(),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long")
    .regex(/^\+?[1-9]\d{9,14}$/, "Invalid phone number"),
  linkedin: z.string().url(),
  summary: z.string().min(25).max(500),
  skills: z.array(z.string()).min(1),
  experience: z.array(
    z.object({
      jobTitle: z.string(),
      company: z.string(),
      location: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      responsibilities: z.array(z.string()),
    }),
  ),
  education: z.array(
    z.object({
      degree: z.string(),
      institution: z.string(),
      graduationYear: z.string(),
    }),
  ),
  projects: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      technologies: z.string(),
    }),
  ),
  template: z.string(),
});

export default function MyForm() {
  const { getToken } = useAuthToken();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      linkedin: "",
      summary: "",
      skills: ["test"],
      experience: [
        {
          jobTitle: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          responsibilities: ["", "", ""],
        },
      ],
      education: [
        {
          degree: "",
          institution: "",
          graduationYear: "",
        },
      ],
      projects: [
        {
          name: "",
          description: "",
          technologies: "",
        },
      ],
      template: "classic",
    },
  });
  const { control } = form;

  const experienceArray = useFieldArray({ control, name: "experience" });
  const educationArray = useFieldArray({ control, name: "education" });
  const projectsArray = useFieldArray({ control, name: "projects" });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const token = getToken();
      if (!token) return;

      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/resumes/generate",
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast({
        title: "Resume generated successfully!",
        variant: "default",
      });
    } catch (error: unknown) {
      console.error("Caught an error:", error);
      toast({
        title: "Failed to generate resume.",
        variant: "destructive",
      });
    }
  }

  return (
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
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Tyler Durden" type="text" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="tyler.durden@email.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your email to show in resume.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex flex-col items-start">
              <FormLabel>Phone number</FormLabel>
              <FormControl className="w-full flex items-center ">
                <PhoneInput
                  placeholder="123-456-7890"
                  {...field}
                  defaultCountry="IN"
                />
              </FormControl>
              <FormDescription>Enter your phone number.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="template"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Template</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-wrap gap-4"
                >
                  {[
                    ["Classic", "classic"],
                    ["Compact", "compact"],
                    ["Modern", "modern"],
                  ].map(([label, value]) => (
                    <div key={value} className="flex items-center space-x-2">
                      <RadioGroupItem id={value} value={value} />
                      <label
                        htmlFor={value}
                        className="text-sm font-medium text-white"
                      >
                        {label}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormDescription>Select your Template</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Linkedin Profile</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://linkedin.com/tyler-durden"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your linkedin profile link
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A brief summary about yourself"
                  className="resize-none text-white bg-zinc-800"
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

        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter your Skills.</FormLabel>
              <FormControl className="bg-zinc-800">
                <TagsInput
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Enter your tags"
                />
              </FormControl>
              <FormDescription>Add tags.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <h3 className="text-lg font-semibold mt-5 text-white">
          Work Experience
        </h3>
        {experienceArray.fields.map((field, index) => (
          <div key={field.id} className="border p-4 rounded-md mb-3 space-y-3">
            <FormField
              control={control}
              name={`experience.${index}.jobTitle`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Software Developer Intern" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`experience.${index}.company`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Company Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`experience.${index}.location`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="City, Country" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <FormField
                control={control}
                name={`experience.${index}.startDate`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`experience.${index}.endDate`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormLabel>Responsibilities</FormLabel>
            {form
              .watch(`experience.${index}.responsibilities`)
              ?.map((_, respIndex) => (
                <FormField
                  key={respIndex}
                  control={control}
                  name={`experience.${index}.responsibilities.${respIndex}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="e.g. Developed features using React"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}

            <Button
              type="button"
              variant="destructive"
              onClick={() => experienceArray.remove(index)}
            >
              ❌ Remove Experience
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            experienceArray.append({
              jobTitle: "",
              company: "",
              location: "",
              startDate: "",
              endDate: "",
              responsibilities: ["", "", ""],
            })
          }
        >
          + Add Another Experience
        </Button>

        <h3 className="text-lg font-semibold mt-5 text-white">Education</h3>
        {educationArray.fields.map((field, index) => (
          <div key={field.id} className="border p-4 rounded-md mb-3 space-y-3">
            <FormField
              control={control}
              name={`education.${index}.degree`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="B.Tech in Computer Science"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`education.${index}.institution`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institution</FormLabel>
                  <FormControl>
                    <Input placeholder="Example University" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`education.${index}.graduationYear`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Graduation Year</FormLabel>
                  <FormControl>
                    <Input placeholder="2023" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="button"
              variant="destructive"
              onClick={() => educationArray.remove(index)}
            >
              ❌ Remove Education
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            educationArray.append({
              degree: "",
              institution: "",
              graduationYear: "",
            })
          }
        >
          + Add Education
        </Button>

        <h3 className="text-lg font-semibold mt-5 text-white">Projects</h3>
        {projectsArray.fields.map((field, index) => (
          <div key={field.id} className="border p-4 rounded-md mb-3 space-y-3">
            <FormField
              control={control}
              name={`projects.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Awesome Project" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`projects.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none text-white"
                      placeholder="Brief project summary"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`projects.${index}.technologies`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technologies Used</FormLabel>
                  <FormControl>
                    <Input placeholder="React, Node.js, Tailwind" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="button"
              variant="destructive"
              onClick={() => projectsArray.remove(index)}
            >
              ❌ Remove Project
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            projectsArray.append({
              name: "",
              description: "",
              technologies: "",
            })
          }
        >
          + Add Project
        </Button>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="text-center px-8 py-6 hover:bg-zinc-700"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
