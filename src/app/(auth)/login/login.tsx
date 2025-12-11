// 'use client';

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from '@components/ui/card';
// import { Field, FieldError, FieldLabel } from '@components/ui/field';

// export default function LoginPage() {
//   return (
//     <div className='flex flex-col items-center justify-center min-h-screen py-2'>
//       <div className='w-full max-w-md'>
//         <Card className='w-full'>
//           <CardHeader>
//             <CardTitle>Login</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
//               <Field>
//                 <FieldLabel htmlFor='email'>Email</FieldLabel>
//                 <Input
//                   id='email'
//                   className='mb-4'
//                   type='email'
//                   placeholder='enter email'
//                   {...register('email')}
//                 />
//                 {errors.email && <FieldError errors={[errors.email]} />}
//               </Field>
//               <Field>
//                 <FieldLabel htmlFor='password'>Password</FieldLabel>
//                 <Input
//                   id='password'
//                   className='mb-4'
//                   type='password'
//                   placeholder='enter password'
//                   {...register('password')}
//                 />
//                 {errors.password && <FieldError errors={[errors.password]} />}
//               </Field>
//               <Field>
//                 <Button type='submit' className='w-full'>
//                   Login
//                 </Button>
//                 {errors.root && <FieldError errors={[errors.root]} />}
//               </Field>
//             </form>
//           </CardContent>
//           <CardFooter className='flex-col gap-4'>
//             <Button variant='outline' className='w-full'>
//               Login with Google
//             </Button>
//             <Button variant='outline' className='w-full'>
//               Login with GitHub
//             </Button>
//             <div>
//               <span className='mr-1'>No account?</span>
//               <Link className='text-blue-600' href={'/signup'}>
//                 Register
//               </Link>
//             </div>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   );
// }
