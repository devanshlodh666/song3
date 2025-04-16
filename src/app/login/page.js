"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Separator } from "../../components/ui/separator"
import { PhoneIcon, MailIcon, LockIcon } from "lucide-react"
import { useState } from "react"
import {signIn,signOut}  from 'next-auth/react'
import { useSession } from "next-auth/react"
import { useSelector,useDispatch } from "react-redux"
import { useRouter } from "next/navigation"

import { toast, ToastContainer,Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AuthPage() {
  const [authMethod, setAuthMethod] = useState("email")

  const route = useRouter()

    const im = useSelector(a=>a.img);
    console.log("im",im);
    
    const [img, setimg] = useState("")
    let {status,data:session} =  useSession()
    if (status === 'authenticated') {
      if (img  === "") {  
        setimg(session?.user) 
        fetch('/api',{
          method:'POST',
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({
            email:session?.user?.email,
            img:"logind.png"  
          })     
        })
        toast.success("logined with google");
        route.push("/")
      } 
    }




    /// form 
    const [form, setForm] = useState({ email: '', phone: '', password: '' });

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value});
    };
    console.log("sa",form);
    
  
    const validate = () => {
      const { email, phone, password } = form;
  
      if (authMethod === "email") {
        if (!email.endsWith("@gmail.com")) {
            toast.error("Email must end with @gmail.com", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
                });
            return false;
          }
      }else{
        if (!/^\d+$/.test(phone) || phone.trim().length !== 10 ) {
            toast.error("Phone must be a number and minimum and maximum 10 digits", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Slide,
                });
            return false;
          }
      }
     
 
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
            });
        return false;
      }
  
      return true;
    };
  
    const handleRegister = async () => {
      if (!validate()) return;
  
      try {
        const res = await fetch('/api/reg', {
          method: 'POST',
          body: JSON.stringify(form),
        });
  
        const data = await res.json();
  
        if (!res.ok) {
          toast.error(data.message || "Something went wrong");
        } else {
            console.log(data);
          toast.success(data.message);
        }
      } catch (err) {
        toast.error("Error connecting to server");
      }
    };
  


    const handleLogin = async () => {
        const { email, phone, password } = form;
    
        // ✅ Basic validation
        if (!password || (!email && !phone)) {
          toast.error("enter Email or phone or password !");
          return;
        }
    
        try {
          const res = await fetch('/api/log', {
            method: 'POST',
            body: JSON.stringify(form),
          });
    
          const data = await res.json();
    
          if (!res.ok) {
            toast.error(data.error || "Login failed");
          } else {
            toast.success(data.message);
            localStorage.setItem("user",JSON.stringify(data.user))
            console.log("Logged in User:", data.user);
            route.push("/");
            // Yahan navigate ya redirect bhi kar sakte ho
          }
        } catch (err) {
          toast.error("Server error, try again later.");
        }
      };
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 p-4">
        <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Slide}
/>
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
        <div className="hidden md:flex flex-col justify-center items-center p-8 bg-white rounded-l-xl shadow-lg">
          <div className="relative w-full h-64 flex items-center justify-center  ">
            {/* <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Authentication"
              fill
              className="object-contain"
              priority
            /> */}
            <img src="loga.png" alt="." width={250} height={250} />
          </div>
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-purple-800">Welcome Back</h2>
            <p className="mt-2 text-gray-600">Sign in to access your account and continue your journey with us</p>
          </div>
        </div>

        <Card className="w-full shadow-lg border-0">
          <Tabs defaultValue="login" className="w-full">
            <CardHeader>
              <div  className="flex items-center justify-between ">
                <CardTitle className="text-2xl font-bold text-purple-800">Authentication</CardTitle>
                <TabsList className="grid grid-cols-2 w-[200px]">
                  <TabsTrigger onClick={()=>setForm({email:"",phone:"",password:""})} value="login">Login</TabsTrigger>
                  <TabsTrigger onClick={()=>setForm({email:"",phone:"",password:""})} value="signup">Sign Up</TabsTrigger>
                </TabsList>
              </div>
              <CardDescription>Enter your details to access your account</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Login Form */}
              <TabsContent value="login" className="space-y-4">
                <div className="flex space-x-4">
                  <Button
                    variant={authMethod === "email" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => {setAuthMethod("email"),setForm({email:"",phone:"",password:""})}}
                  >
                    <MailIcon className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                  <Button
                    variant={authMethod === "phone" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => {setAuthMethod("phone"),setForm({email:"",phone:"",password:""})}}
                  >
                    <PhoneIcon className="mr-2 h-4 w-4" />
                    Phone
                  </Button>
                </div>

                {authMethod === "email" ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <MailIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input value={form.email} name="email" onChange={handleChange} id="email" type="email" placeholder="name@example.com" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        
                      </div>
                      <div className="relative">
                        <LockIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input value={form.password} onChange={handleChange} id="password" name="password" type="password" className="pl-10" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <PhoneIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input value={form.phone} onChange={handleChange} id="phone"  name="phone" type="tel" placeholder="000-000-0000" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-phone">Password</Label>
                      <div className="relative">
                        <LockIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input value={form.password} onChange={handleChange} id="password-phone"  name="password" type="password" className="pl-10" />
                      </div>
                    </div>
                  </div>
                )}

                <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleLogin}>Login</Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full" onClick={()=>{(!session)?signIn('google'):signOut('google')}} >
                  <img src="google.png" alt="." width={20} height={20} />
                    {/* className="mr-2" */}
                  Google
                </Button>
              </TabsContent>

              {/* Sign Up Form */}
              <TabsContent value="signup" className="space-y-4">
                <div className="flex space-x-4">
                  <Button
                    variant={authMethod === "email" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => {setAuthMethod("email"),setForm({email:"",password:"",phone:""})}}
                  >
                    <MailIcon className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                  <Button
                    variant={authMethod === "phone" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => {setAuthMethod("phone"),setForm({email:"",password:"",phone:""})}}
                  >
                    <PhoneIcon className="mr-2 h-4 w-4" />
                    Phone
                  </Button>
                </div>

                {authMethod === "email" ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {/* <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input onChange={handleChange} id="firstName" placeholder="John" />
                      </div> */}
                      {/* <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input onChange={handleChange} id="lastName" placeholder="Doe" />
                      </div> */}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-signup">Email</Label>
                      <div className="relative">
                        <MailIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input  value={form.email} onChange={handleChange} name="email" id="email-signup" type="email" placeholder="name@example.com" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-signup">Password</Label>
                      <div className="relative">
                        <LockIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input value={form.password} onChange={handleChange} name="password" id="password-signup" type="password" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      {/* <Label htmlFor="confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <LockIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input onChange={handleChange}  name="password" id="confirm-password" type="password" className="pl-10" />
                      </div> */}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {/* <div className="space-y-2">
                        <Label htmlFor="firstName-phone">First Name</Label>
                        <Input onChange={handleChange} id="firstName-phone" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName-phone">Last Name</Label>
                        <Input onChange={handleChange} id="lastName-phone" placeholder="Doe" />
                      </div> */}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone-signup">Phone Number</Label>
                      <div className="relative">
                        <PhoneIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input value={form.phone} onChange={handleChange} name="phone" id="phone-signup" type="tel" placeholder="000-000-0000" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-phone-signup">Password</Label>
                      <div className="relative">
                        <LockIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input value={form.password} onChange={handleChange} name="password" id="password-phone-signup" type="password" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      {/* <Label htmlFor="confirm-password-phone">Confirm Password</Label>
                      <div className="relative">
                        <LockIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input onChange={handleChange} name="password" id="confirm-password-phone" type="password" className="pl-10" />
                      </div> */}
                    </div>
                  </div>
                )}

                <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleRegister} >Sign Up</Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full" onClick={()=>{(!session)?signIn('google'):signOut('google')}}>
                  {/* <Image
                    src="/placeholder.svg?height=20&width=20"
                    alt="Google"
                    width={20}
                    height={20}
                    className="mr-2"
                  /> */}
                  <img src="google.png" alt="."  width={20} height={20}/>
                  Google
                </Button>
              </TabsContent>
            </CardContent>

            {/* <CardFooter className="flex flex-col items-center justify-center pt-0">
              <p className="text-xs text-gray-500 mt-4">
                By continuing, you agree to our{" "}
                <Link href="/terms" className="text-purple-600 hover:text-purple-800">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-purple-600 hover:text-purple-800">
                  Privacy Policy
                </Link>
              </p>
            </CardFooter> */}
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
