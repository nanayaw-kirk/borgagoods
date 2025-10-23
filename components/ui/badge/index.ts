import { type VariantProps, cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
        'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
        'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
        'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground',
        inactive : 'bg-muted/50 dark:bg-border/50 text-primary/70',
        none: 'dark:text-foreground/80 text-gray-500  font-medium border shadow-none',
        pending: 'font-medium bg-border/60 shadow-none border-none',
        confirmed: 'text-teal-500 font-medium bg-teal-500/20 shadow-none border-none',
        processing : 'text-cyan-500 font-medium bg-cyan-500/20 hover:bg-cyan-500/20 shadow-none border-none',
        'scheduled-for-delivery' : 'text-blue-500 font-medium bg-blue-500/20 hover:bg-blue-500/20 shadow-none border-none',
        'out-for-delivery' : 'text-blue-500 font-medium bg-blue-500/20 hover:bg-blue-500/20 shadow-none border-none',
        'delivery-failed' : 'text-rose-500 font-medium bg-rose-500/20 hover:bg-rose-500/20 shadow-none border-none',
        delivered: 'text-green-500 font-medium bg-green-500/20 shadow-none border-none',

        'return-request-submitted' : 'text-fuchsia-500 font-medium bg-fuchsia-500/20 hover:bg-fuchsia-500/20 shadow-none border-none',
        'return-request-processing' : 'text-fuchsia-500 font-medium bg-fuchsia-500/20 hover:bg-fuchsia-500/20 shadow-none border-none',
        'return-request-rejected' : 'text-fuchsia-500 font-medium bg-fuchsia-500/20 hover:bg-fuchsia-500/20 shadow-none border-none',
        'return-request-approved' : 'text-fuchsia-500 font-medium bg-fuchsia-500/20 hover:bg-fuchsia-500/20 shadow-none border-none',


        paid: ' text-green-500 font-medium bg-green-500/20 shadow-none border-none',
        completed: 'text-green-500 font-medium bg-green-500/20 shadow-none border-none',
        claimed: ' text-green-500 font-medium bg-green-500/20 shadow-none border-none',
        failed : 'text-red-500 font-medium bg-red-500/20 hover:bg-red-500/20 shadow-none border-none',
        refunding : 'text-fuchsia-500 font-medium bg-fuchsia-500/20 hover:bg-fuchsia-500/20 shadow-none border-none',
        'partially-returned' : 'text-purple-500 font-medium bg-purple-500/20 hover:bg-purple-500/20 shadow-none border-none',
        returned : 'text-fuchsia-500 font-medium bg-fuchsia-500/20 hover:bg-fuchsia-500/20 shadow-none border-none',
        refunded : 'text-purple-500 font-medium bg-purple-500/20 hover:bg-purple-500/20 shadow-none border-none',
        cancelled : 'text-red-500 font-medium bg-red-500/20 hover:bg-red-500/20 shadow-none border-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
  )

export type BadgeVariants = VariantProps<typeof badgeVariants>
