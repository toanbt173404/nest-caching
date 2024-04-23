import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { CACHE_DATA_INSTANCE } from 'src/const/cache.constant';

@Module({
  imports: [HttpModule],
  controllers: [PokemonController],
  providers: [PokemonService, CACHE_DATA_INSTANCE],
})
export class PokemonModule {}
