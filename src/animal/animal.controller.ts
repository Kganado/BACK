import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { WeightHistoryDto } from './dto/weight-history.dto';
import { OwnerDto } from './dto/owner.dto';
import { PregnancyHistoryDto } from './dto/pregnancy-history.dto';
import { SpecieDto } from './dto/species.dto';
import { OriginDto } from './dto/origin.dto';
import { UpdateOriginDto } from './dto/updateOrigin.dto';
import { PregnancyDto } from './dto/pregnancy.dto';
import { UpdatePregnancyDto } from './dto/update-pregnancy.dto';
import { LocationDto } from './dto/location.dto';
import { UpdateFertilityDto } from './dto/update-fertility';
import { UpdateWeightHistoryDto } from './dto/update-weight-history.dto';

@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Post('register')
  create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalService.create(createAnimalDto);
  }

  @Get('animals')
  findAll() {
    return this.animalService.findAll();
  }

  @Get('owner-animals/:id')
  findAnimalsByOwner(@Param('id') id: string) {
    return this.animalService.getAllAnimalsByOwner(id);
  }

  @Get('animal/:id')
  findOne(@Param('id') id: string) {
    return this.animalService.findOne(+id);
  }

  @Patch('animal/:id')
  update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
    return this.animalService.update(+id, updateAnimalDto);
  }

  // Funcionalidades
  @Post('weight/register')
  registerWeight( @Body() weightHistoryDto: WeightHistoryDto ) {
    return this.animalService.newWeightHistory( weightHistoryDto );
  
  }

  @Patch('weight/update')
  updateWeight( @Body() updateWeightHistoryDto: UpdateWeightHistoryDto ) {
    return this.animalService.updateWeightHistory( updateWeightHistoryDto );
  }

  @Patch('weight/delete/:id')
  deleteWeight( @Param('id', ParseIntPipe) id: number ) {
    return this.animalService.deleteWeightHistory(id);
  }

  @Get('owners')
  allOwner() {
    return this.animalService.getAllOwners();
  }

  @Post('owner')
  addOwner( @Body() ownerDto: OwnerDto ) {
    return this.animalService.addOwner( ownerDto );
  }

  @Get('owners/:id')
  getOwersAnimal( @Param('id', ParseIntPipe) id: number ) {
    return this.animalService.getOnwersbyAnimal(id);
  }
  @Get('animals/:id')
  getAnimalsOwner( @Param('id') id: string ) {
    return this.animalService.getAnimalsbyOwner(id);
  }

  @Get('pregnancy/:id')
  getPregnancyAnimal( @Param('id', ParseIntPipe) id: number ) {
    return this.animalService.getPregnancy(id);
  }
  @Post('pregnancy')
  truePregnancyAnimal( 
    @Body() data,
  ) {
    return this.animalService.truePregnancy(data);
  }

  @Post('pregnancy-history')
  addPregnandyHistory( @Body() pregnancyHistoryDto: PregnancyHistoryDto ) {
    return this.animalService.addPregnancyHistory( pregnancyHistoryDto );
  }

  @Post('species')
  addNewSpecie( @Body() specieDto: SpecieDto ){
    return this.animalService.addSpecie(specieDto);
  }

  @Get('species')
  getAllSpecies() {
    return this.animalService.getAllSpecie();
  }

  @Post('origin')
  newOrigin( @Body() originDto: OriginDto ){
    return this.animalService.addOrigin( originDto );
  }

  @Patch('origin')
  updateOrigin( @Body() updateOriginDto: UpdateOriginDto ) {
    return this.animalService.updateOrigin( updateOriginDto );
  }

  @Patch('origin')
  updatePregnancy( @Body() updatePregnancyDto: UpdatePregnancyDto ) {
    return this.animalService.updatePregnancy( updatePregnancyDto );
  }

  @Post('location')
  addLocation( @Body() locationDto: LocationDto ){
    return this.animalService.addLocation( locationDto );
  }

  @Get('location')
  getAllLocations(){
    return this.animalService.getAllLocations();
  }

  @Patch('fetility')
  updateFertility( @Body() updateFertilityDto: UpdateFertilityDto ){
    return this.animalService.updateFertility(updateFertilityDto);
  }

  @Get('exchange')
  getExchange() {
    return this.animalService.getExchange();
  }

}
