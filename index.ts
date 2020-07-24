import { mapValues, compact, uniq } from 'lodash';
import { Skeleton, UUIDv4 } from './model';

export function findNeighbors(
  skeleton: Skeleton,
  cardIdActive: UUIDv4,
) {
  const currentTraildName = skeleton.cards[cardIdActive].trailId;
  const indexOfCurrentTrail = Object.keys(skeleton.trails).indexOf(currentTraildName);
  const lessTrailName = Object.keys(skeleton.trails)[indexOfCurrentTrail - 1];
  const moreTrailName = Object.keys(skeleton.trails)[indexOfCurrentTrail + 1];

  const getContentOfTrail = (trailName: any) => skeleton.trails[trailName];

  const getCardsByTrailName = (trailName: any) => {
    if (trailName === undefined) {
      return [undefined];
    }

    if (getContentOfTrail(trailName).cardIdActive !== null) {
      const twoCard = getContentOfTrail(trailName).cardIdActive;
      let orderOfTwoCard: number;
      let orderOfOneCard: number;
      let orderOfThreeCard: number;

      mapValues(skeleton.cards, (n, i) => {
        if (i === twoCard) {
          orderOfTwoCard = n.order;
        }
      });

      orderOfOneCard = orderOfTwoCard - 1;
      orderOfThreeCard = orderOfTwoCard + 1;
      let oneCard;
      let threeCard;

      mapValues(skeleton.cards, (n, i) => {
        if (n.trailId === trailName && n.order === orderOfOneCard) {
          oneCard = i;
        }
        if (n.trailId === trailName && n.order === orderOfThreeCard) {
          threeCard = i;
        }
      });

      if (orderOfOneCard = 0) {
        threeCard = null;
      }

      return [oneCard, twoCard, threeCard];
    }
    let oneCard;
    let twoCard;

    mapValues(skeleton.cards, (n: any, i: any) => {
      if (n.trailId === trailName && n.order === 0) {
        oneCard = i;
      }
      if (n.trailId === trailName && n.order === 1) {
        twoCard = i;
      }
    });
    return [oneCard, twoCard];
  };
  const first = getCardsByTrailName(lessTrailName);
  const second = getCardsByTrailName(currentTraildName);
  const third = getCardsByTrailName(moreTrailName);
  return uniq(compact([...first, ...second, ...third]));
}
