import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { DecksService } from "./decks.service";
import { CreateDeckDto } from "./deck-create.dto";
import { DeckResponseDto } from "./deck-response.dto";
import { UpdateDeckDto } from "./deck-update.dto";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { UserId } from "src/decorators/user-id.decorator";
import { DeckOwnershipGuard } from "src/guards/deck-owner.guard";
import { UserService } from "src/user/user.service";
import { FindDecksResponseDTO } from "./find-decks-response.dto";
import { FindDecksQueryDTO } from "./find-decks-query.dto";

@Controller("decks")
export class DecksController {
  constructor(
    private readonly decksService: DecksService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async findAll(
    @Query() query: FindDecksQueryDTO,
  ): Promise<FindDecksResponseDTO> {
    const { limit, offset, search, username, withUserData } = query;

    let userId: number | undefined;

    if (username) {
      const user = await this.userService.findOne(username);
      if (!user) {
        throw new NotFoundException(`User with username ${username} not found`);
      }
      userId = user.id;
    }

    const decks = await this.decksService.findAll(
      limit,
      offset,
      search,
      userId,
      withUserData,
    );

    return {
      limit,
      offset,
      search,
      username,
      withUserData,
      data: decks.map((deck) => {
        delete deck.userId;
        if (deck.user) {
          delete deck.user.password;
        }
        return deck as DeckResponseDto;
      }),
    };
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<DeckResponseDto> {
    const deck = await this.decksService.findOne(id);
    if (!deck) {
      throw new NotFoundException(`Deck with ID ${id} not found`);
    }
    delete deck.userId;
    return deck;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createDeckDto: CreateDeckDto,
    @UserId() userId: number,
  ): Promise<DeckResponseDto> {
    const deck = await this.decksService.create(createDeckDto, userId);
    delete deck.userId;
    return deck;
  }

  @UseGuards(JwtAuthGuard, DeckOwnershipGuard)
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateDeckDto: UpdateDeckDto,
  ): Promise<DeckResponseDto> {
    const deck = await this.decksService.update(id, updateDeckDto);
    delete deck.userId;
    return deck;
  }

  @UseGuards(JwtAuthGuard, DeckOwnershipGuard)
  @Delete(":id")
  async remove(
    @Param("id") id: string,
  ): Promise<{ statusCode: number; message: string }> {
    await this.decksService.remove(id);
    return {
      statusCode: 200,
      message: "Deck deleted successfully",
    };
  }
}
