import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CUSTOM_CACHE_DATA } from 'src/const/cache.constant';

@Injectable()
export class PokemonService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CUSTOM_CACHE_DATA.key) private cacheService: Cache,
  ) {}

  async getPokemon(id: number): Promise<string> {
    const cachedData = await this.cacheService.get<{ name: string }>(
      id.toString(),
    );
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return `${cachedData.name}`;
    } else {
      console.log('Hello from api')
      const { data } = await this.httpService.axiosRef.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`,
      );
      await this.cacheService.set(id.toString(), data);
      return `${data.name}`;
    }
    
  }
}
