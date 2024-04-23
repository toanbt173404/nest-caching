import { Provider } from "@nestjs/common";
import { Cache, caching } from "cache-manager";

import redisStore from 'cache-manager-redis-store';

export type CustomCacheConfig = {
    key: string
    host: string
    port: any
    db: number
    pass: string | null
    ttl: number
  }
export function build_cache_provider(config: CustomCacheConfig) : Provider {
  return {
    provide: config.key,
    useFactory: (): Cache => {
      const outputConfig : any = {
        store: redisStore,
        host: config.host, 
        port: config.port,
        db: config.db,
        ttl: config.ttl,
        auth_pass: config.pass
      }
    
      const cache = caching(outputConfig)
      return cache
    }
  }
}

export const CUSTOM_CACHE_DATA : CustomCacheConfig = {
    key: "CUSTOM_CACHE_DATA",
    db: 3,
    host: 'localhost',
    port: 6379,
    pass: 'example',
    ttl: 0
  }

export const CACHE_DATA_INSTANCE = build_cache_provider(CUSTOM_CACHE_DATA)


const cache = caching({
    store: redisStore,
    host: 'localhost',
    port: 6379,
    auth_pass: 'example',
    ttl: 600,
    db: 3
  });
async function testCache() {
    await cache.set('test', 'data');
    const data = await cache.get('test');
    console.log(data); 
  }
  
  testCache().catch(console.error);