/**
 * @jest-environment jsdom
 */

import { useFormat } from '../src/use/format';
import { bold, italic, useRaw } from '../src/use/raw';

describe('Raw - Editor Convert', () => {
  beforeEach(() => {});

  it('should not convert unnecessary paragraph', () => {
    const entity = {
      id: 0,
      type: 'paragraph',
      raw: 'Untitled',
      createdAt: useFormat().actually(),
      updatedAt: useFormat().actually(),
    };

    const raw = useRaw().convert(entity);

    expect(entity.raw).toEqual(raw);
  })

  it('should not convert unnecessary heading one', () => {
    const entity = {
      id: 0,
      type: 'heading-one',
      raw: 'Untitled',
      createdAt: useFormat().actually(),
      updatedAt: useFormat().actually(),
    };

    const raw = useRaw().convert(entity);

    expect(entity.raw).toEqual(raw);
  })

  it('should not convert unnecessary heading two', () => {
    const entity = {
      id: 0,
      type: 'heading-two',
      raw: 'Untitled',
      createdAt: useFormat().actually(),
      updatedAt: useFormat().actually(),
    };

    const raw = useRaw().convert(entity);

    expect(entity.raw).toEqual(raw);
  })

  it('should not convert unnecessary heading three', () => {
    const entity = {
      id: 0,
      type: 'heading-three',
      raw: 'Untitled',
      createdAt: useFormat().actually(),
      updatedAt: useFormat().actually(),
    };

    const raw = useRaw().convert(entity);

    expect(entity.raw).toEqual(raw);
  })

  // italic
  it('should not convert italic in heading one', () => {
    const entity = {
      id: 0,
      type: 'heading-one',
      raw: 'Untitled *test* Untitled',
      createdAt: useFormat().actually(),
      updatedAt: useFormat().actually(),
    };

    const raw = useRaw().convert(entity);

    expect(entity.raw).toEqual(raw);
  })

  it('should not convert italic in heading two', () => {
    const entity = {
      id: 0,
      type: 'heading-two',
      raw: 'Untitled *test* Untitled',
      createdAt: useFormat().actually(),
      updatedAt: useFormat().actually(),
    };

    const raw = useRaw().convert(entity);

    expect(entity.raw).toEqual(raw);
  })

  it('should not convert italic in heading three', () => {
    const entity = {
      id: 0,
      type: 'heading-three',
      raw: 'Untitled *test* Untitled',
      createdAt: useFormat().actually(),
      updatedAt: useFormat().actually(),
    };

    const raw = useRaw().convert(entity);

    expect(entity.raw).toEqual(raw);
  })

  it('should correct bold convert', () => {
    const entity = {
      id: 0,
      type: 'paragraph',
      raw: 'Untitled *test* Untitled',
      createdAt: useFormat().actually(),
      updatedAt: useFormat().actually(),
    };

    const raw = useRaw().convert(entity);

    expect(`Untitled ${italic().open()}test${italic().close()} Untitled`).toEqual(raw);
  })

  it('should not convert break italic insert', () => {
    const entity = {
      id: 0,
      type: 'paragraph',
      raw: 'Untitled *test Untitled',
      createdAt: useFormat().actually(),
      updatedAt: useFormat().actually(),
    };

    const raw = useRaw().convert(entity);

    expect(`Untitled ${italic().open()}test Untitled`).toEqual(raw);
  })

  // bold
  it('should not convert bold in heading one', () => {
    const entity = {
      id: 0,
      type: 'heading-one',
      raw: 'Untitled &test& Untitled',
      createdAt: useFormat().actually(),
      updatedAt: useFormat().actually(),
    };

    const raw = useRaw().convert(entity);

    expect(entity.raw).toEqual(raw);
  })

  it('should not convert bold in heading two', () => {
    const entity = {
      id: 0,
      type: 'heading-two',
      raw: 'Untitled &test& Untitled',
      createdAt: useFormat().actually(),
      updatedAt: useFormat().actually(),
    };

    const raw = useRaw().convert(entity);

    expect(entity.raw).toEqual(raw);
  })

  it('should not convert bold in heading three', () => {
    const entity = {
      id: 0,
      type: 'heading-three',
      raw: 'Untitled &test& Untitled',
      createdAt: useFormat().actually(),
      updatedAt: useFormat().actually(),
    };

    const raw = useRaw().convert(entity);

    expect(entity.raw).toEqual(raw);
  })

  it('should correct bold convert', () => {
    const entity = {
      id: 0,
      type: 'paragraph',
      raw: 'Untitled &test& Untitled',
      createdAt: useFormat().actually(),
      updatedAt: useFormat().actually(),
    };

    const raw = useRaw().convert(entity);

    expect(`Untitled ${bold().open()}test${bold().close()} Untitled`).toEqual(raw);
  })

  it('should not convert break bold insert', () => {
    const entity = {
      id: 0,
      type: 'paragraph',
      raw: 'Untitled &test Untitled',
      createdAt: useFormat().actually(),
      updatedAt: useFormat().actually(),
    };

    const raw = useRaw().convert(entity);

    expect(`Untitled ${bold().open()}test Untitled`).toEqual(raw);
  })
})