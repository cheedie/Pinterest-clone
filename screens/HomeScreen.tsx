import pins from '../assets/data/pins'
import MasonryLists from '../components/MasonryLists';

export default function HomeScreen() {
  return (
   <MasonryLists pins={pins}/>
  );
}

