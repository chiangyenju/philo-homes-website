import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import UserTypes from '@/components/UserTypes'
import Demo3D from '@/components/Demo3D'
import CTA from '@/components/CTA'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <Hero />
        <Features />
        <UserTypes />
        <Demo3D />
        <CTA />
      </main>
    </div>
  )
}
