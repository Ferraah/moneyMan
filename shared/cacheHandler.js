import { Cache } from "react-native-cache";
import AsyncStorage from '@react-native-async-storage/async-storage';

const cache = new Cache({
    namespace: "EasyManager",
    policy: {
        stdTTL: 0 // the standard ttl as number in seconds, default: 0 (unlimited)
    },
    backend: AsyncStorage
});
