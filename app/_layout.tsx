import { AuthProvider } from '@/context/AuhContext';
import { ListingProvider } from '@/context/ListingContext';
import '@/global.css';
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <ListingProvider>
        <Stack>
        <Stack.Screen name='onboarding' options={{
          headerShown: false
        }}/>
        
        <Stack.Screen name='(auth)' options={{
          headerShown: false
        }}  />
        
        <Stack.Screen name='(tabs)' options={{
          headerShown: false
        }}  />

        <Stack.Screen name='recent-listings' options={{
          headerShown: false
        }}  />

        <Stack.Screen name='add-listing' options={{
          presentation: 'modal',
          headerShown: false
        }}  />

        <Stack.Screen name='category/[id]' options={{
          headerShown: false
        }}  />

        <Stack.Screen name='category/details/[id]' options={{
          headerShown: false
        }}  />

      
        </Stack>
      </ListingProvider>
    </AuthProvider>
    
  )
}
