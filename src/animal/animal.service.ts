import { BadRequestException, Injectable, InternalServerErrorException, Logger, OnModuleInit } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { PrismaClient } from '@prisma/client';
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
import { Cron } from '@nestjs/schedule';
import { ExchangeAPIResponse } from './interfaces/exchange-api-response.interface';

@Injectable()
export class AnimalService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('AnimalService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database conected');
  }

  async create(createAnimalDto: CreateAnimalDto) {

    const { animalCode } = createAnimalDto

    try {

      const animal = await this.animal.findFirst({
        where: { animalCode }
      });

      if (animal) {
        throw new BadRequestException(`${animalCode} already exists`);
      }

      const newAnimal = await this.animal.create({
        data: {
          ...createAnimalDto,

          Fertility: {
            create: {}
          },

          Pregnancy: {
            create: {}
          }

        }
      })

      return {
        animal: newAnimal
      }

    } catch (error) {
      throw new BadRequestException(error.message)
    }

  }

  async findAll() {
    try {

      const animals = await this.animal.findMany({
        include: {
          location: {
            select: {
              location: true,
            }
          },
          weighingHistory: {
            include: {
              user: {
                select: {
                  name: true,
                }
              }
            },
            orderBy: {
              date: 'desc'
            }
          },
          MatingHistory: {
          },
          pregnancyHistory: true,
        }
      });
      return animals;

    } catch (error) {
      throw new IntersectionObserver(error.message)
    }
  }

  async getAllAnimalsByOwner(id: string) {
    try {
      const animals = await this.animal.findMany({
        where: {
          Owner: {
            some: {
              userId: id
            }
          }
        },
        include: {
          location: {
            select: {
              location: true,
            }
          },
          weighingHistory: {
            include: {
              user: {
                select: {
                  name: true,
                }
              }
            },
            orderBy: {
              date: 'desc'
            }
          },
          MatingHistory: true,
          pregnancyHistory: true,
        }
      });
      return animals;

    } catch (error) {
      throw new IntersectionObserver(error.message)
    }
  }

  async findOne(id: number) {
    const animal = await this.animal.findFirst({
      where: { id },
      include: {
        weighingHistory: {
          select: {
            date: true,
            weight: true,
            user: {
              select: {
                userName: true,
              }
            }
          },
          orderBy: {
            date: 'desc'
          }
        }
      }
    })

    if (!animal) {
      throw new BadRequestException(`Animal with id ${id}`)
    }

    return animal;
  }

  async update(id: number, updateAnimalDto: UpdateAnimalDto) {
    const { id: __, ...data } = updateAnimalDto;
    await this.findOne(id);

    return this.animal.update({
      where: { id },
      data: data
    })
  }

  async changeStatusAlive(id: number) {
    await this.findOne(id);

    return this.animal.update({
      where: { id },
      data: { isAlive: false }
    })

  }

  async newWeightHistory(weightHistoryDto: WeightHistoryDto) {

    const { animalId } = weightHistoryDto;
    const {birthdate} = await this.findOne(animalId);
    const dateNow = new Date()
    let ageMonths = (dateNow.getFullYear() - birthdate.getFullYear()) * 12;
    ageMonths -= birthdate.getMonth();
    ageMonths += dateNow.getMonth();
    try {

      const history = await this.weightHistory.create({
        data: {
          ...weightHistoryDto,
          ageMonths: (ageMonths < 0) ? 0 : ageMonths
        }
      })

      return history;

    } catch (error) {
      throw new BadRequestException(error.message)
    }

  }

  async findWeightHistory( id: number ) {

    try {
      const history = this.weightHistory.findFirst({
        where: {id_weight_history: id}
      })

      if( !history ) {
        throw new BadRequestException('History not found')
      }

      return history;
      
    } catch (error) {
      throw new BadRequestException(error.message)
    }

  }

  async updateWeightHistory( updateWeightHistoryDto: UpdateWeightHistoryDto) {
    const { id_weight_history, ...data } = updateWeightHistoryDto;
    await this.findWeightHistory(id_weight_history);

    return this.weightHistory.update({
      where: { id_weight_history },
      data: data
    })
  }

  async deleteWeightHistory( id: number ) {
    const history = await this.findWeightHistory(id);

    return this.weightHistory.update({
      where: { id_weight_history: id },
      data: {
        isActive: !history.isActive
      }
    })
  }

  async getAllOwners() {

    const owners = await this.owner.findMany()
    return owners;
  }

  async addOwner(ownerDto: OwnerDto) {

    const { animalId, userId } = ownerDto;
    try {

      await this.findOne(animalId);

      const addOwner = this.owner.create({
        data: { ...ownerDto }
      })

      return addOwner;

    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }

  }

  async getOnwersbyAnimal(id: number) {
    const owners = await this.owner.findMany({
      where: {
        animalId: id
      },
      include: {
        user: {
          select: {
            name: true,
          }
        }
      }
    })

    return owners
  }

  async getAnimalsbyOwner(id: string) {
    const owners = await this.owner.findMany({
      where: {
        userId: id
      },
      include: {
        animal: {
          select: {
            animalCode: true,
          }
        }
      }
    })

    return owners
  }


  async addSpecie(specieDto: SpecieDto) {

    try {

      const newSpecie = await this.species.create({
        data: { ...specieDto }
      });

      return newSpecie;

    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }

  }

  async getAllSpecie() {
    return await this.species.findMany({})
  }

  async addOrigin(originDto: OriginDto) {

    try {

      const newOrigin = await this.origin.create({
        data: { ...originDto }
      })

      return newOrigin;

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

  }

  async updateOrigin(updateOriginDto: UpdateOriginDto) {

    const { animalId, id_origin } = updateOriginDto;

    try {

      await this.findOne(animalId);

      return await this.origin.update({
        where: { id_origin },
        data: {
          ...updateOriginDto
        }
      })


    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

  }


  async updatePregnancy(updatePregnancyDto: UpdatePregnancyDto) {

    const { animalId, id } = updatePregnancyDto;

    try {

      await this.findOne(animalId);

      return await this.pregnancy.update({
        where: { id },
        data: { ...updatePregnancyDto }
      })

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

  }

  async addLocation(locationDto: LocationDto) {

    try {

      const location = await this.location.create({
        data: { ...locationDto }
      })

      return location;

    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

  }

  async getAllLocations() {
    return await this.location.findMany({});
  }

  async updateFertility( updateFertilityDto: UpdateFertilityDto ) {
    
    const {animalId, id, ...data} =  updateFertilityDto;

    await this.findOne(animalId);

    try {

      return await this.fertility.update({
        where: {id},
        data: data
      })
      
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }

  }


  async addPregnancyHistory(pregnancyHistoryDto: PregnancyHistoryDto) {

    const { animalId } = pregnancyHistoryDto;

    await this.findOne(animalId);

    const pregnancyHistory = await this.pregnancyHistory.create({
      data: { ...pregnancyHistoryDto }
    })

    return pregnancyHistory;

  }

  // CAMBIO DE $ A COLONES
  @Cron('0 0 * * *')
  async handleCron() {

    const resp = await fetch(process.env.API_EXCHANGE_URL)
    const data: ExchangeAPIResponse = await resp.json()

    // console.log(data.quotes.USDCRC.toFixed(2))

    await this.exchangeRate.update({
      where: {
        id : 1
      },
      data: {
        dollarToColones: +data.quotes.USDCRC.toFixed(2)
      }
    })
  }

  async getExchange() {
    const exchange = this.exchangeRate.findFirst({
      where: {id: 1}
    })

    return exchange
  }

  async getPregnancy(id: number) {
    const pregnancy = this.pregnancy.findFirst({
      where: {
        animalId: id
      }
    })

    return pregnancy;
  }

  async truePregnancy(data) {
    try {
      await this.findOne(data.id);
      const pregnancy = await this.pregnancy.update({
        where: {
          animalId: data.id
        },
        data: {
          isPregnant: true,
          date: data.date
        }
      })

      return pregnancy;
    } catch (error) {
      console.log(error.message)
      throw new InternalServerErrorException(error.message)
    }
  }

}
