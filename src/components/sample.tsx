// "use client";

// import React, { useRef, ReactNode } from "react";
// import { ThreeBackground } from "@/components/ui/spline-scene-basic";
// import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
// import { Slot } from "@radix-ui/react-slot";
// import * as LabelPrimitive from "@radix-ui/react-label";
// import { cva, type VariantProps } from "class-variance-authority";
// import { cn } from "@/lib/utils";

// // ------------------------------------------------------------------------------------
// // BUTTON
// // ------------------------------------------------------------------------------------

// const buttonVariants = cva(
//   "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
//   {
//     variants: {
//       variant: { default: "bg-primary text-primary-foreground hover:bg-primary/90" },
//       size: { default: "h-10 px-4 py-2" },
//     },
//     defaultVariants: { variant: "default", size: "default" },
//   }
// );

// interface ButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof buttonVariants> {
//   asChild?: boolean;
// }

// const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ className, variant, size, asChild = false, ...props }, ref) => {
//     const Comp = asChild ? Slot : "button";
//     return (
//       <Comp
//         className={cn(buttonVariants({ variant, size, className }))}
//         ref={ref}
//         {...props}
//       />
//     );
//   }
// );
// Button.displayName = "Button";

// // ------------------------------------------------------------------------------------
// // INPUT / LABEL / TEXTAREA
// // ------------------------------------------------------------------------------------

// const Input = React.forwardRef<HTMLInputElement, any>(({ className, type, ...props }, ref) => (
//   <input
//     type={type}
//     className={cn(
//       "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
//       className
//     )}
//     ref={ref}
//     {...props}
//   />
// ));
// Input.displayName = "Input";

// const Label = React.forwardRef<HTMLLabelElement, any>(({ className, ...props }, ref) => (
//   <LabelPrimitive.Root
//     ref={ref}
//     className={cn("text-sm font-medium leading-none", className)}
//     {...props}
//   />
// ));
// Label.displayName = LabelPrimitive.Root.displayName;

// const Textarea = React.forwardRef<HTMLTextAreaElement, any>(
//   ({ className, ...props }, ref) => (
//     <textarea
//       className={cn(
//         "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
//         className
//       )}
//       ref={ref}
//       {...props}
//     />
//   )
// );
// Textarea.displayName = "Textarea";

// // ------------------------------------------------------------------------------------
// // CONTACT FORM
// // ------------------------------------------------------------------------------------

// const Contact2 = ({
//   title = "Contact Us",
//   description = "We are available for questions, feedback, or collaboration opportunities.",
//   phone = "(123) 34567890",
//   email = "email@example.com",
//   web = { label: "shadcnblocks.com", url: "https://shadcnblocks.com" },
// }) => {
//   return (
//     <section className="py-10 w-full">
//       <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 lg:flex-row lg:gap-10">
        
//         {/* LEFT */}
//         <div className="mx-auto flex max-w-md flex-col gap-30">
//           <div className="text-left">
//             <h1 className="mb-2 text-4xl font-semibold">{title}</h1>
//             <p className="text-muted-foreground">{description}</p>
//           </div>

//           <div>
//             <h3 className="mb-4 text-2xl font-semibold">Contact Details</h3>
//             <ul className="ml-4 list-disc">
//               <li><span className="font-bold">Phone: </span>{phone}</li>
//               <li>
//                 <span className="font-bold">Email: </span>
//                 <a href={`mailto:${email}`} className="underline">{email}</a>
//               </li>
//               <li>
//                 <span className="font-bold">Web: </span>
//                 <a href={web.url} target="_blank" className="underline">{web.label}</a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* RIGHT — FORM */}
//         <div className="mx-auto flex max-w-lg flex-col gap-6 rounded-lg border p-6 bg-white dark:bg-zinc-900">
//           <div className="flex gap-4">
//             <div className="grid w-full gap-1.5">
//               <Label>First Name</Label>
//               <Input placeholder="First Name" />
//             </div>
//             <div className="grid w-full gap-1.5">
//               <Label>Last Name</Label>
//               <Input placeholder="Last Name" />
//             </div>
//           </div>

//           <div className="grid w-full gap-1.5">
//             <Label>Email</Label>
//             <Input type="email" placeholder="Email" />
//           </div>

//           <div className="grid w-full gap-1.5">
//             <Label>Subject</Label>
//             <Input type="text" placeholder="Subject" />
//           </div>

//           <div className="grid w-full gap-1.5">
//             <Label>Message</Label>
//             <Textarea placeholder="Type your message here..." rows={4} />
//           </div>

//           <Button className="w-full bg-black text-white hover:bg-gray-800">
//             Send Message
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// };

// // ------------------------------------------------------------------------------------
// // SCROLL CONTAINER
// // ------------------------------------------------------------------------------------

// const ContainerScroll = ({ titleComponent, children }: any) => {
//   const containerRef = useRef<HTMLDivElement>(null);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   const [isMobile, setIsMobile] = React.useState(false);
//   React.useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth <= 768);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // ⭐ NEW ANIMATION: TABLET ENTERS FROM BOTTOM
//   const scale = useTransform(scrollYProgress, [0, 1], isMobile ? [0.9, 1] : [1.1, 1]);
//   const translate = useTransform(scrollYProgress, [0, 1], [300, -10]); // ← LOWER START
//   const rotate = useTransform(scrollYProgress, [0, 1], [25, 0]);

//   // ⭐ NEW ANIMATION: CONTACT FORM APPEARS LATER
//   const contentOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
//   const contentY = useTransform(scrollYProgress, [0.3, 0.6], [50, 0]);

//   return (
//     <div
//       ref={containerRef}
//       className="h-[70rem] md:h-[90rem] flex items-center justify-center relative p-4 md:p-20"
//     >
//       <div className="py-10 md:py-32 w-full relative" style={{ perspective: "1000px" }}>
//         <Header translate={translate} titleComponent={titleComponent} />

//         <Card rotate={rotate} translate={translate} scale={scale}>
//           {/* ⭐ CONTENT FADES IN AFTER TABLET ENTERS */}
//           <motion.div style={{ opacity: contentOpacity, y: contentY }}>
//             {children}
//           </motion.div>
//         </Card>
//       </div>
//     </div>
//   );
// };

// // ------------------------------------------------------------------------------------
// // HEADER + CARD
// // ------------------------------------------------------------------------------------

// const Header = ({ translate, titleComponent }: any) => (
//   <motion.div style={{ y: translate }} className="max-w-5xl mx-auto text-center">
//     {titleComponent}
//   </motion.div>
// );

// const Card = ({ rotate, scale, translate, children }: any) => (
//   <motion.div
//     style={{
//       rotateX: rotate,
//       y: translate,
//       scale,
//       transformStyle: "preserve-3d",
//     }}
//     className="
//       max-w-7xl mx-auto 
//       h-[35rem] md:h-[45rem] 
//       w-full 
//       border-4 border-[#6C6C6C] 
//       p-4 md:p-6 
//       bg-[#222222] 
//       rounded-[30px] 
//       shadow-2xl
//       antialiased
//     "
//   >
//     <div
//       className="
//         h-full w-full rounded-2xl
//         bg-white/95 dark:bg-zinc-900/95
//         backdrop-blur-lg backdrop-saturate-200
//         p-6 md:p-8 
//         overflow-y-auto
//         shadow-inner
//       "
//     >
//       <div className="origin-top">{children}</div>
//     </div>
//   </motion.div>
// );

// // ------------------------------------------------------------------------------------
// // PAGE
// // ------------------------------------------------------------------------------------

// export default function ContactPage() {
//   return (
//     <div className="min-h-screen text-white relative">
//       <div className="fixed inset-0 -z-10">
//         <ThreeBackground />
//         <div className="absolute inset-0 bg-black/30" />
//       </div>

//       <div className="relative z-10">
//         <ContainerScroll
//           titleComponent={
//             <>
//               <h1 className="text-4xl font-semibold text-black dark:text-white">
//                 Contact Us <br />
//                 <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
//                   Get in Touch
//                 </span>
//               </h1>
//             </>
//           }
//         >
//           <Contact2 />
//         </ContainerScroll>
//       </div>
//     </div>
//   );
// }
