import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import bgImage from "@/assets/signimg.png";
import Navbar from "@/components/Navbar";

// ✅ Zod schema for signup validation
const signupSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),

    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

const SignUpPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      // Map fullName to name for backend compatibility
      const payload = { ...data, name: data.fullName };
      delete payload.fullName;
      console.log("Signup Data (mapped):", payload);

      // API call to backend auth/register
      const response = await axios.post("https://panchkarmafinal-xd1o.onrender.com/api/auth/register", payload);
      const { token, user } = response.data;

      // Save JWT and user in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("currentUser", JSON.stringify(user));

      toast({
        title: "Signup Successful!",
        description: `Welcome, ${user.name}!`,
      });

      window.dispatchEvent(new Event("userLogin"));

  // Redirect to login page after successful signup
  navigate('/login');
    } catch (error: any) {
      toast({
        title: "Signup Failed",
        description: error.response?.data?.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background image */}
      <img
        src={bgImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Fixed Navbar */}
      <Navbar  />

      {/* Signup Card */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-[80px] px-4">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-primary mb-6">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                {...register("fullName")}
                className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                {...register("phone")}
                className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>



            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                {...register("confirmPassword")}
                className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-all"
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-primary hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
