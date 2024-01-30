import { CSSProperties, createElement } from "react";

export enum FilterType {
  BLUR,
  PIXELATE,
  COLOR,
}

export type Effect = {
  type: FilterType;
  params: any;
  svg?: any;
  css?: CSSProperties;
  tagName?: string;
};

export type PixelateParams = {
  pixelSize: number;
};

const FilterMap = {
  blend: "feBlend",
  blur: "feGaussianBlur",
  color: "feColorMatrix",
  "color-matrix": "feColorMatrix",
  "component-transfer": "feComponentTransfer",
  composite: "feComposite",
  convolve: "feConvolveMatrix",
  "convolve-matrix": "feConvolveMatrix",
  diffuse: "feDiffuseLighting",
  "diffuse-lighting": "feDiffuseLighting",
  displacement: "feDisplacementMap",
  "displacement-map": "feDisplacementMap",
  flood: "feFlood",
  "gaussian-blur": "feGaussianBlur",
  image: "feImage",
  merge: "feMerge",
  morphology: "feMorphology",
  offset: "feOffset",
  specular: "feSpecularLightning",
  "specular-lighting": "feSpecularLightning",
  tile: "feTile",
  turbulence: "feTurbulence",
};

function fromHTML(html, trim = true) {
  // Process the HTML string.
  html = trim ? html.trim() : html;
  if (!html) return null;

  // Then set up a new template element.
  const template = document.createElement("template");
  template.innerHTML = html;
  const result = template.content.children;

  // Then return either an HTMLElement or HTMLCollection,
  // based on whether the input HTML had one or more roots.
  if (result.length === 1) return result[0];
  return null;
}

/**
 * Allows the construction of composite SVG / CSS filters to apply on image
 */
export class Filter {
  private effects: Effect[] = [];

  static merge(...filters: Filter[]) {
    const result = new Filter();
    const mergedEffects = filters.reduce((merged, current) => {
      return merged.concat(current.effects);
    }, []);
    result.effects = mergedEffects;
    return result;
  }

  blur(params?: any) {
    const effect: Effect = {
      type: FilterType.BLUR,
      params,
      svg: "<blur blabla>",
    };
    this.effects.push(effect);
    return this;
  }

  color(params?: any) {
    const effect: Effect = {
      type: FilterType.BLUR,
      params,
      svg: `<feColorMatrix type="matrix" values="${params.join(" ")}" />`,
      tagName: FilterMap["color"],
    };
    this.effects.push(effect);
    return this;
  }

  pixelate(params?: PixelateParams) {
    const effect: Effect = {
      type: FilterType.PIXELATE,
      params,
      css: {
        imageRendering: "pixelated",
        // scale: "50%",
        // width: "200%",
        // height: "200%",
      },
    };
    this.effects.push(effect);
    return this;
  }

  renderSVG() {
    const result = this.effects.flatMap((el) => {
      if (!el.svg) {
        return [];
      }
      const htmlElement: Element = fromHTML(el.svg);

      const props = {};
      for (let i = 0; i < htmlElement.attributes.length; i++) {
        const attr = htmlElement.attributes.item(i);
        props[attr.name] = attr.value;
      }
      return createElement(el.tagName, props);
    });
    return result;
  }

  renderCSS() {
    return this.effects
      .flatMap((el) => (el.css ? el.css : []))
      .reduce(
        (merged, current) => ({
          ...merged,
          ...current,
        }),
        {}
      );
  }
}

// const filters = new Filter().blur().color().pixelate();
