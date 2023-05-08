import { JwtService } from '@nestjs/jwt';

export type PayloadToken = {
  id: string;
  iat: string;
};

export const decodeHeaderToken = (
  jwtService: JwtService,
  authHeader: string,
): PayloadToken | undefined =>
  jwtService.decode(authHeader.replace('Bearer ', '')) as PayloadToken;
