import '@/global.css';
import { Stack } from "expo-router";

export default function ListingLayout() {
  return (
    <Stack>
      <Stack.Screen name='recent-listings' options={{
          headerShown: false
        }}  />

       

        <Stack.Screen name='edit-listing' options={{
          presentation: 'modal',
          headerShown: false
        }}  />

         <Stack.Screen name='my-listings' options={{
          headerShown: false
        }}  />
    </Stack>
  )
}
